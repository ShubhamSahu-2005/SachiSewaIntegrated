export interface Fundraiser {
  userID: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    goalAmount: number;
    raisedAmount: number;
    daysLeft: number;
    donors: number;
    document?: string[]; 
  }
  // Fundraiser Api Call from backend
  export const fundraisersData: Fundraiser[] = [
    {
      userID: "1",
      title: "Kidney Transplant Fund",
      description:
        "Support John Doe, a father of two, in his journey to receive a life-saving kidney transplant. Every contribution brings hope.",
      category: "Health",
      imageUrl:
        "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300",
      goalAmount: 75000,
      raisedAmount: 25000,
      daysLeft: 30,
      donors: 200,
      document: [
        "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300",
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&height=200&width=300",
      ],
    },
    {
      userID: "2",
      title: "Heart Surgery for Jane",
      description:
        "Help Jane Smith undergo urgent heart surgery to treat her critical condition. Your donation will save a life.",
      category: "Health",
      imageUrl:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&height=200&width=300",
      goalAmount: 100000,
      raisedAmount: 45000,
      daysLeft: 20,
      donors: 350,
      document: [
        "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300",
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&height=200&width=300",
      ],
    },
    {
      userID: "3",
      title: "Cancer Treatment for Emily",
      description:
        "Emily is battling cancer and needs funds for her chemotherapy sessions. Let’s come together to support her fight.",
      category: "Health",
      imageUrl:
        "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300",
      goalAmount: 60000,
      raisedAmount: 32000,
      daysLeft: 15,
      donors: 180,
      document: [
        "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300",
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&height=200&width=300",
      ],
    },
    {
      userID: "4",
        title: "Cancer Treatment for Emily",
        description:
          "Emily is battling cancer and needs funds for her chemotherapy sessions. Let’s come together to support her fight.",
        category: "Health",
        imageUrl:
          "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300",
        goalAmount: 60000,
        raisedAmount: 32000,
        daysLeft: 15,
        donors: 180,
        document: [
          "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300",
          "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&height=200&width=300",
        ],
      },
      {
        userID: "5",
        title: "Cancer Treatment for Emily",
        description:
          "Emily is battling cancer and needs funds for her chemotherapy sessions. Let’s come together to support her fight.",
        category: "Health",
        imageUrl:
          "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300",
        goalAmount: 60000,
        raisedAmount: 32000,
        daysLeft: 15,
        donors: 180,
        document: [
          "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300",
          "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&height=200&width=300",
        ],
      },
      {
        userID: "6",
        title: "Cancer Treatment for Emily",
        description:
          "Emily is battling cancer and needs funds for her chemotherapy sessions. Let’s come together to support her fight.",
        category: "Health",
        imageUrl:
          "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300",
        goalAmount: 60000,
        raisedAmount: 32000,
        daysLeft: 15,
        donors: 180,
        document: [
          "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300",
          "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&height=200&width=300",
        ],
      },
      {
        userID: "7",
        title: "Cancer Treatment for Emily",
        description:
          "Emily is battling cancer and needs funds for her chemotherapy sessions. Let’s come together to support her fight.",
        category: "Health",
        imageUrl:
          "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300",
        goalAmount: 60000,
        raisedAmount: 32000,
        daysLeft: 15,
        donors: 180,
        document: [
          "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&height=200&width=300",
          "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&height=200&width=300",
        ],
      },
  ];
  