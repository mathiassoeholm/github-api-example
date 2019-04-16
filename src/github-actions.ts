import { action } from 'typesafe-actions'

export enum GithubActionType {
  SET_VIEWER_NAME = 'github/SET_VIEWER_NAME',
  FETCH_FAILED = 'github/FETCH_FAILED',
}

export const setViewerName = (viewerName: string) => action(GithubActionType.SET_VIEWER_NAME, viewerName)
export const fetchFailed = (error: Error) => action(GithubActionType.FETCH_FAILED, error)
