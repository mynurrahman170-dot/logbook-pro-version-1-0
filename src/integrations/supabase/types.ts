export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      fuel_settings: {
        Row: {
          allowance: number
          id: boolean
          mileage: number
          unit_price: number
        }
        Insert: {
          allowance?: number
          id?: boolean
          mileage?: number
          unit_price?: number
        }
        Update: {
          allowance?: number
          id?: boolean
          mileage?: number
          unit_price?: number
        }
        Relationships: []
      }
      log_entries: {
        Row: {
          allowance: number
          created_at: string
          created_by: string
          direction: string | null
          driver_id: string
          entry_date: string
          entry_time: string
          excess: number | null
          id: string
          kind: string
          night_hold: boolean
          ordinal: number
          quantity: number
          route_id: string | null
          supervisor_id: string
          total: number | null
          unit_price: number
          vehicle_id: string
        }
        Insert: {
          allowance?: number
          created_at?: string
          created_by?: string
          direction?: string | null
          driver_id: string
          entry_date?: string
          entry_time?: string
          excess?: number | null
          id?: string
          kind: string
          night_hold?: boolean
          ordinal?: number
          quantity?: number
          route_id?: string | null
          supervisor_id: string
          total?: number | null
          unit_price?: number
          vehicle_id: string
        }
        Update: {
          allowance?: number
          created_at?: string
          created_by?: string
          direction?: string | null
          driver_id?: string
          entry_date?: string
          entry_time?: string
          excess?: number | null
          id?: string
          kind?: string
          night_hold?: boolean
          ordinal?: number
          quantity?: number
          route_id?: string | null
          supervisor_id?: string
          total?: number | null
          unit_price?: number
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "log_entries_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "master_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "log_entries_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "master_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "log_entries_supervisor_id_fkey"
            columns: ["supervisor_id"]
            isOneToOne: false
            referencedRelation: "master_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "log_entries_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "master_data"
            referencedColumns: ["id"]
          },
        ]
      }
      master_data: {
        Row: {
          created_at: string
          direction: string | null
          distance: number | null
          id: string
          kind: string
          mileage: number | null
          name: string
        }
        Insert: {
          created_at?: string
          direction?: string | null
          distance?: number | null
          id?: string
          kind: string
          mileage?: number | null
          name: string
        }
        Update: {
          created_at?: string
          direction?: string | null
          distance?: number | null
          id?: string
          kind?: string
          mileage?: number | null
          name?: string
        }
        Relationships: []
      }
      staff_accounts: {
        Row: {
          access: string
          active: boolean
          counter_id: string | null
          created_at: string
          display_name: string
          id: string
          staff_code: string
          user_id: string
        }
        Insert: {
          access?: string
          active?: boolean
          counter_id?: string | null
          created_at?: string
          display_name: string
          id?: string
          staff_code: string
          user_id: string
        }
        Update: {
          access?: string
          active?: boolean
          counter_id?: string | null
          created_at?: string
          display_name?: string
          id?: string
          staff_code?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_accounts_counter_id_fkey"
            columns: ["counter_id"]
            isOneToOne: false
            referencedRelation: "master_data"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_log: {
        Args: {
          p_confirm?: boolean
          p_date: string
          p_driver: string
          p_kind: string
          p_night_hold?: boolean
          p_quantity?: number
          p_route?: string
          p_supervisor: string
          p_time?: string
          p_vehicle: string
        }
        Returns: Json
      }
      can_use_app: { Args: never; Returns: boolean }
      delete_log: { Args: { p_id: string }; Returns: undefined }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      staff_access: { Args: never; Returns: string }
      update_log: {
        Args: {
          p_date: string
          p_driver: string
          p_id: string
          p_night_hold?: boolean
          p_quantity: number
          p_route?: string
          p_supervisor: string
          p_time: string
          p_vehicle: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff"],
    },
  },
} as const
