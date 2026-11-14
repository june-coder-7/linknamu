export type Profile = {
  name: string;
  bio: string;
  imageUrl: string;
};

export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export const profile: Profile = {
  name: "김클로",
  bio: "세계 최강 바이브코더",
  imageUrl: "/profile.svg",
};

// TODO: 실제 링크로 교체
export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com" },
  { id: "blog", title: "블로그", url: "https://example.com" },
  { id: "instagram", title: "Instagram", url: "https://instagram.com" },
];
