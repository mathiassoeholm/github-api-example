import { action } from 'typesafe-actions'

export enum GithubActionType {
  SET_VIEWER_NAME = 'github/SET_VIEWER_NAME'
}

export const setViewerName = (viewerName: string) => action(GithubActionType.SET_VIEWER_NAME, viewerName)
