export interface GithubState {
  viewer?: GithubViewer
}

export interface GithubViewer {
  name: string,
  repositories: Repository[],
}

export interface Repository {
  languages: Language[],
}

export interface Language {
  name: string,
  size: number,
}
