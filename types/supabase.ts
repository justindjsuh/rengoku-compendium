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
      boss_difficulty: {
        Row: {
          boss_id: number
          boss_name: string
          difficulty: string
          id: number
        }
        Insert: {
          boss_id: number
          boss_name: string
          difficulty: string
          id?: number
        }
        Update: {
          boss_id?: number
          boss_name?: string
          difficulty?: string
          id?: number
        }
      }
      bosses: {
        Row: {
          banner: string
          id: number
          name: string
          order: number
        }
        Insert: {
          banner: string
          id?: number
          name: string
          order: number
        }
        Update: {
          banner?: string
          id?: number
          name?: string
          order?: number
        }
      }
      clear_history: {
        Row: {
          created_at: string
          date: string
          difficulty_id: number
          id: number
          sweeper: string | null
        }
        Insert: {
          created_at?: string
          date: string
          difficulty_id: number
          id?: number
          sweeper?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          difficulty_id?: number
          id?: number
          sweeper?: string | null
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
      loot_history: {
        Row: {
          created_at: string | null
          id: number
          item_name: string | null
          owner: string | null
          week_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          item_name?: string | null
          owner?: string | null
          week_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          item_name?: string | null
          owner?: string | null
          week_id?: number
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
