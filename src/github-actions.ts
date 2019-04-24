import { action } from 'typesafe-actions'
import {GithubViewer} from './github-types'

export enum GithubActionType {
  FETCH_INFO = 'github/FETCH_INFO',
  SET_VIEWER = 'github/SET_VIEWER',
  FETCH_FAILED = 'github/FETCH_FAILED',
}

export const fetchInfo = () => action(GithubActionType.FETCH_INFO)
export const setViewer = (viewer: GithubViewer) => action(GithubActionType.SET_VIEWER, viewer)
export const fetchFailed = (error: Error) => action(GithubActionType.FETCH_FAILED, error)
