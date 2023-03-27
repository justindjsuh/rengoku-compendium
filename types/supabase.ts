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
      ba: {
        Row: {
          ba_id: number
          boss_dmg: string | null
          created_at: string | null
          damage: string | null
          id: number
          ied: string | null
          main_stat: string | null
          player_job: string | null
          player_name: string
          range: string | null
          time: string | null
        }
        Insert: {
          ba_id: number
          boss_dmg?: string | null
          created_at?: string | null
          damage?: string | null
          id?: number
          ied?: string | null
          main_stat?: string | null
          player_job?: string | null
          player_name: string
          range?: string | null
          time?: string | null
        }
        Update: {
          ba_id?: number
          boss_dmg?: string | null
          created_at?: string | null
          damage?: string | null
          id?: number
          ied?: string | null
          main_stat?: string | null
          player_job?: string | null
          player_name?: string
          range?: string | null
          time?: string | null
        }
      }
      ba_history: {
        Row: {
          created_at: string | null
          date: string
          id: number
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: number
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: number
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
