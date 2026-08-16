CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_slug TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  install_type TEXT NOT NULL,
  postcode TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT bookings_slot_unique UNIQUE (booking_date, booking_time)
);
GRANT SELECT, INSERT ON public.bookings TO anon, authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
-- Anyone can create a booking (public booking form)
CREATE POLICY "Anyone can create bookings"
  ON public.bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
-- No direct SELECT — PII protected. Use get_booked_slots() function instead.
CREATE OR REPLACE FUNCTION public.get_booked_slots(p_date DATE)
RETURNS TABLE(booking_time TIME)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT booking_time FROM public.bookings WHERE booking_date = p_date;
$$;
GRANT EXECUTE ON FUNCTION public.get_booked_slots(DATE) TO anon, authenticated;
