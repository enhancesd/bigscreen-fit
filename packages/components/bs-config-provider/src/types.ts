
export interface BsConfigProviderInterface {
    isFullScreen: boolean;
    id?: string;
    [x: string]: any;
    win: WinType;
}


export interface WinType {
    innerHeight: number;
    innerWidth: number;
}
