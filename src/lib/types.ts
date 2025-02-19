export interface Challenge {
  id: string;
  amount: number;
  title: string;
  market: Market;
  reportedAt: string;
  reportedOutcome: string;
  fixture: Fixture;
  acceptingUserId: string;
  creatingUserId: string;
  creatingUser: {
    id: string;
    username: string;
  };
  acceptingUser: {
    id: string;
    username: string;
  };
  creatingUserPrediction: string;
  acceptingUserPrediction: string;
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

export type Market = {
  id: string;
  title: string;
  outcomes: string[];
  fixtures: Fixture;
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
