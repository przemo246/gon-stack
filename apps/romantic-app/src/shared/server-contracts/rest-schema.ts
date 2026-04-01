type QuestionConstraints = {
  min: number;
  max: number;
  required: boolean;
};

type UserProfileQuestion =
  | {
      id: number;
      key: string;
      label: string;
      category: string;
      constraints: QuestionConstraints;
      value: number;
      type: 'numeric';
    }
  | {
      id: number;
      key: string;
      label: string;
      category: string;
      constraints: QuestionConstraints;
      type: 'select';
      options: { value: string; label: string }[];
      value: string;
    }
  | {
      id: number;
      key: string;
      label: string;
      category: string;
      constraints: QuestionConstraints;
      type: 'text';
      value: string;
    }
  | {
      id: number;
      key: string;
      label: string;
      category: string;
      constraints: QuestionConstraints;
      type: 'slide';
      badges: { min: string; max: string };
      value: number;
    };

export type GetUserProfile = {
  path: '/config/user-profile';
  responses: {
    200: {
      code: 200;
      groups: {
        id: number;
        key: string;
        label: string;
        description: string;
        questions: UserProfileQuestion[];
      }[];
    };
    401: {
      code: 401;
      type: 'unauthorized';
      message: string;
    };
    500: {
      code: 500;
      type: 'internal-server-error';
      message: string;
    };
  };
};
