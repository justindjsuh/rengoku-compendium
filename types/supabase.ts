export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      ba_history: {
        Row: {
          boss_dmg: string | null
          created_at: string | null
          damage: string | null
          date: string
          id: number
          ied: string | null
          main_stat: string | null
          player_name: string | null
          range: string | null
          time: string
          user_id: number
        }
        Insert: {
          boss_dmg?: string | null
          created_at?: string | null
          damage?: string | null
          date: string
          id?: number
          ied?: string | null
          main_stat?: string | null
          player_name?: string | null
          range?: string | null
          time?: string
          user_id: number
        }
        Update: {
          boss_dmg?: string | null
          created_at?: string | null
          damage?: string | null
          date?: string
          id?: number
          ied?: string | null
          main_stat?: string | null
          player_name?: string | null
          range?: string | null
          time?: string
          user_id?: number
        }
      }
      events: {
        Row: {
          created_at: string | null
          date: string
          description: string
          id: number
        }
        Insert: {
          created_at?: string | null
          date: string
          description: string
          id?: number
        }
        Update: {
          created_at?: string | null
          date?: string
          description?: string
          id?: number
        }
      }
      users: {
        Row: {
          approved: boolean
          auth_id: string
          created_at: string | null
          discord: string
          email: string
          id: number
          isAdmin: boolean
          player_job: string | null
          username: string
        }
        Insert: {
          approved?: boolean
          auth_id: string
          created_at?: string | null
          discord: string
          email: string
          id?: number
          isAdmin?: boolean
          player_job?: string | null
          username: string
        }
        Update: {
          approved?: boolean
          auth_id?: string
          created_at?: string | null
          discord?: string
          email?: string
          id?: number
          isAdmin?: boolean
          player_job?: string | null
          username?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
