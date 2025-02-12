export interface Challenge {
  id: string;
  title: string;
  fixtures: {
    metadata: {
      tournament: string;
      date: string;
    };
    title: string;
  };
}

export interface ChallengeOutcome {
  title: string;
  id: string;
  outcomes: string[];
}

export type Fixture = {
  id: string;
  title: string;
  metadata: {
    competition: string;
    date: string;
  };
};

export type UserData = {
  balance: number;
  email: string;
  id: string;
  losses: number;
  participatedChallenges: number;
  phone: string;
  playthrough: {
    current: number;
    target: number;
  };
  referralCode: string;
  referralCount: number;
  username: string;
  wins: number;
};
