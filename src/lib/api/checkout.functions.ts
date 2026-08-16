import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
export const createBooking = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      serviceTitle: z.string().min(1),
      manufacturer: z.string().min(1),
      installType: z.enum(["Freestanding", "Integrated", "American style"]),
      postcode: z.string().min(1),
      customerName: z.string().min(1),
      phone: z.string().min(1),
      email: z.string().email(),
      bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      bookingTime: z.string().regex(/^\d{1,2}:\d{2}(:\d{2})?$/),
    }),
  )
  .handler(async ({ data }) => {
    const bookingTime = data.bookingTime.length === 5
      ? `${data.bookingTime}:00`
      : data.bookingTime;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inserted, error: insertError } = await supabaseAdmin
      .from("bookings")
      .insert({
        service_slug: data.serviceTitle,
        manufacturer: data.manufacturer,
        install_type: data.installType,
        postcode: data.postcode,
        customer_name: data.customerName,
        phone: data.phone,
        email: data.email,
        booking_date: data.bookingDate,
        booking_time: bookingTime,
      })
      .select("id")
      .single();
    if (insertError || !inserted) {
      if (insertError?.code === "23505") {
        return { ok: false as const, error: "slot_taken" as const };
      }
      console.error("Booking insert failed:", insertError);
      return { ok: false as const, error: "insert_failed" as const };
    }
    return { ok: true as const, error: null, bookingId: inserted.id };
  });
export const getBookedSlots = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    }),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("bookings")
      .select("booking_time")
      .eq("booking_date", data.date);
    if (error) {
      console.error("getBookedSlots failed:", error);
      return { times: [] as string[] };
    }
    return {
      times: (rows ?? []).map((r) => (r.booking_time as string).slice(0, 5)),
    };
  });
