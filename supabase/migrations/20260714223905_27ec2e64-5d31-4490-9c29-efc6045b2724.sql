-- Drop the SECURITY DEFINER function exposed to anon/authenticated
DROP FUNCTION IF EXISTS public.get_booked_slots(date);
-- Replace overly-permissive INSERT policy with validated checks
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
CREATE POLICY "Public can create valid bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (
  booking_date >= CURRENT_DATE
  AND length(btrim(customer_name)) > 0
  AND length(btrim(email)) > 3
  AND length(btrim(phone)) > 0
  AND length(btrim(service_slug)) > 0
);
-- Lock down direct API read/write; app uses service-role server functions
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.bookings FROM anon, authenticated;
GRANT INSERT ON public.bookings TO anon, authenticated;
GRANT ALL ON public.bookings TO service_role;
