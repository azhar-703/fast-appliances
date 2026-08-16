export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          service_slug: string;
          manufacturer: string;
          install_type: string;
          postcode: string;
          customer_name: string;
          phone: string;
          email: string;
          booking_date: string;
          booking_time: string;
          created_at: string;
          payment_status: string;
          stripe_session_id: string | null;
          amount_pennies: number | null;
        };
        Insert: {
          id?: string;
          service_slug: string;
          manufacturer: string;
          install_type: string;
          postcode: string;
          customer_name: string;
          phone: string;
          email: string;
          booking_date: string;
          booking_time: string;
          created_at?: string;
          payment_status?: string;
          stripe_session_id?: string | null;
          amount_pennies?: number | null;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
