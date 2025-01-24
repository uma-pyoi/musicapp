import { IArtist } from './IArtist';
import { ITrack } from './ITrack';

export interface ITrackHistory {
	id: string;
	userId: string;
	trackId: string;
	datetime: string;
	track: ITrack;
	artist: IArtist;
}
