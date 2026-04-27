export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      game_answers: {
        Row: {
          answer_json: Json;
          answer_text: string | null;
          created_at: string;
          game_question_id: string;
          is_skipped: boolean;
          is_timeout: boolean;
          submitted_at: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          answer_json?: Json;
          answer_text?: string | null;
          created_at?: string;
          game_question_id: string;
          is_skipped?: boolean;
          is_timeout?: boolean;
          submitted_at?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          answer_json?: Json;
          answer_text?: string | null;
          created_at?: string;
          game_question_id?: string;
          is_skipped?: boolean;
          is_timeout?: boolean;
          submitted_at?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'game_answers_game_question_id_fkey';
            columns: ['game_question_id'];
            isOneToOne: false;
            referencedRelation: 'game_questions';
            referencedColumns: ['id'];
          },
        ];
      };
      game_participants: {
        Row: {
          game_id: string;
          joined_at: string;
          left_at: string | null;
          score: number;
          user_id: string;
        };
        Insert: {
          game_id: string;
          joined_at?: string;
          left_at?: string | null;
          score?: number;
          user_id: string;
        };
        Update: {
          game_id?: string;
          joined_at?: string;
          left_at?: string | null;
          score?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'game_participants_game_id_fkey';
            columns: ['game_id'];
            isOneToOne: false;
            referencedRelation: 'games';
            referencedColumns: ['id'];
          },
        ];
      };
      game_questions: {
        Row: {
          closed_at: string | null;
          created_at: string;
          game_id: string;
          id: string;
          opened_at: string | null;
          ordinal: number;
          question_id: string;
          status: Database['public']['Enums']['game_question_status'];
          time_limit_sec: number;
          updated_at: string;
        };
        Insert: {
          closed_at?: string | null;
          created_at?: string;
          game_id: string;
          id?: string;
          opened_at?: string | null;
          ordinal: number;
          question_id: string;
          status?: Database['public']['Enums']['game_question_status'];
          time_limit_sec?: number;
          updated_at?: string;
        };
        Update: {
          closed_at?: string | null;
          created_at?: string;
          game_id?: string;
          id?: string;
          opened_at?: string | null;
          ordinal?: number;
          question_id?: string;
          status?: Database['public']['Enums']['game_question_status'];
          time_limit_sec?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'game_questions_game_id_fkey';
            columns: ['game_id'];
            isOneToOne: false;
            referencedRelation: 'games';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'game_questions_question_id_fkey';
            columns: ['question_id'];
            isOneToOne: false;
            referencedRelation: 'quiz_questions';
            referencedColumns: ['id'];
          },
        ];
      };
      games: {
        Row: {
          created_at: string;
          created_by_user_id: string;
          ended_at: string | null;
          id: string;
          room_id: string;
          settings: Json;
          started_at: string | null;
          status: Database['public']['Enums']['game_status'];
          target_score: number;
          updated_at: string;
          winner_user_id: string | null;
        };
        Insert: {
          created_at?: string;
          created_by_user_id: string;
          ended_at?: string | null;
          id?: string;
          room_id: string;
          settings?: Json;
          started_at?: string | null;
          status?: Database['public']['Enums']['game_status'];
          target_score?: number;
          updated_at?: string;
          winner_user_id?: string | null;
        };
        Update: {
          created_at?: string;
          created_by_user_id?: string;
          ended_at?: string | null;
          id?: string;
          room_id?: string;
          settings?: Json;
          started_at?: string | null;
          status?: Database['public']['Enums']['game_status'];
          target_score?: number;
          updated_at?: string;
          winner_user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'games_room_id_fkey';
            columns: ['room_id'];
            isOneToOne: false;
            referencedRelation: 'rooms';
            referencedColumns: ['id'];
          },
        ];
      };
      profile_questions: {
        Row: {
          badge_max: string | null;
          badge_min: string | null;
          created_at: string;
          default_numeric: number | null;
          default_text: string | null;
          group_description: string;
          group_key: string;
          group_label: string;
          id: number;
          key: string;
          label: string;
          max_value: number | null;
          min_value: number | null;
          question_type: Database['public']['Enums']['question_type'];
          required: boolean;
          select_options: Json | null;
        };
        Insert: {
          badge_max?: string | null;
          badge_min?: string | null;
          created_at?: string;
          default_numeric?: number | null;
          default_text?: string | null;
          group_description: string;
          group_key: string;
          group_label: string;
          id?: never;
          key: string;
          label: string;
          max_value?: number | null;
          min_value?: number | null;
          question_type: Database['public']['Enums']['question_type'];
          required?: boolean;
          select_options?: Json | null;
        };
        Update: {
          badge_max?: string | null;
          badge_min?: string | null;
          created_at?: string;
          default_numeric?: number | null;
          default_text?: string | null;
          group_description?: string;
          group_key?: string;
          group_label?: string;
          id?: never;
          key?: string;
          label?: string;
          max_value?: number | null;
          min_value?: number | null;
          question_type?: Database['public']['Enums']['question_type'];
          required?: boolean;
          select_options?: Json | null;
        };
        Relationships: [];
      };
      quiz_questions: {
        Row: {
          created_at: string;
          difficulty: Database['public']['Enums']['quiz_question_difficulty'];
          id: string;
          is_active: boolean;
          options: Json;
          prompt: string;
          question_type: Database['public']['Enums']['quiz_question_type'];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          difficulty?: Database['public']['Enums']['quiz_question_difficulty'];
          id?: string;
          is_active?: boolean;
          options?: Json;
          prompt: string;
          question_type: Database['public']['Enums']['quiz_question_type'];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          difficulty?: Database['public']['Enums']['quiz_question_difficulty'];
          id?: string;
          is_active?: boolean;
          options?: Json;
          prompt?: string;
          question_type?: Database['public']['Enums']['quiz_question_type'];
          updated_at?: string;
        };
        Relationships: [];
      };
      room_participants: {
        Row: {
          is_ready: boolean;
          joined_at: string;
          left_at: string | null;
          role: string;
          room_id: string;
          score: number;
          user_id: string;
        };
        Insert: {
          is_ready?: boolean;
          joined_at?: string;
          left_at?: string | null;
          role: string;
          room_id: string;
          score?: number;
          user_id: string;
        };
        Update: {
          is_ready?: boolean;
          joined_at?: string;
          left_at?: string | null;
          role?: string;
          room_id?: string;
          score?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'room_participants_room_id_fkey';
            columns: ['room_id'];
            isOneToOne: false;
            referencedRelation: 'rooms';
            referencedColumns: ['id'];
          },
        ];
      };
      rooms: {
        Row: {
          code: string;
          created_at: string;
          ended_at: string | null;
          expires_at: string;
          host_user_id: string;
          id: string;
          max_players: number;
          min_players: number;
          settings: Json;
          started_at: string | null;
          status: Database['public']['Enums']['room_status'];
          target_score: number;
          updated_at: string;
        };
        Insert: {
          code: string;
          created_at?: string;
          ended_at?: string | null;
          expires_at?: string;
          host_user_id: string;
          id?: string;
          max_players?: number;
          min_players?: number;
          settings?: Json;
          started_at?: string | null;
          status?: Database['public']['Enums']['room_status'];
          target_score?: number;
          updated_at?: string;
        };
        Update: {
          code?: string;
          created_at?: string;
          ended_at?: string | null;
          expires_at?: string;
          host_user_id?: string;
          id?: string;
          max_players?: number;
          min_players?: number;
          settings?: Json;
          started_at?: string | null;
          status?: Database['public']['Enums']['room_status'];
          target_score?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_game_host: { Args: { p_game_id: string }; Returns: boolean };
      is_game_question_host: {
        Args: { p_game_question_id: string };
        Returns: boolean;
      };
      is_game_question_member: {
        Args: { p_game_question_id: string };
        Returns: boolean;
      };
      is_game_question_open: {
        Args: { p_game_question_id: string };
        Returns: boolean;
      };
      is_game_room_member: { Args: { p_game_id: string }; Returns: boolean };
      is_room_host: { Args: { p_room_id: string }; Returns: boolean };
      is_room_member: { Args: { p_room_id: string }; Returns: boolean };
    };
    Enums: {
      game_question_status: 'pending' | 'open' | 'closed' | 'evaluated';
      game_status: 'pending' | 'active' | 'paused' | 'finished' | 'cancelled';
      question_type: 'numeric' | 'select' | 'text' | 'slide';
      quiz_question_difficulty: 'easy' | 'medium' | 'hard';
      quiz_question_type: 'single_choice' | 'yes_no' | 'scale' | 'text';
      room_status:
        | 'waiting'
        | 'ready'
        | 'active'
        | 'paused'
        | 'finished'
        | 'cancelled'
        | 'expired';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      game_question_status: ['pending', 'open', 'closed', 'evaluated'],
      game_status: ['pending', 'active', 'paused', 'finished', 'cancelled'],
      question_type: ['numeric', 'select', 'text', 'slide'],
      quiz_question_difficulty: ['easy', 'medium', 'hard'],
      quiz_question_type: ['single_choice', 'yes_no', 'scale', 'text'],
      room_status: [
        'waiting',
        'ready',
        'active',
        'paused',
        'finished',
        'cancelled',
        'expired',
      ],
    },
  },
} as const;
