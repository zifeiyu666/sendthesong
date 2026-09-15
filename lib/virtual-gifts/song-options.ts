export type VirtualGiftSongOption = {
  id: string;
  title: string;
  audioUrl: string;
  imageUrl: string | null;
  duration: number | null;
};

export function toVirtualGiftSongOptions(
  songs: Array<{
    id: string;
    title: string;
    audioUrl: string;
    imageUrl: string | null;
    duration: number | null;
  }>,
): VirtualGiftSongOption[] {
  return songs.map((song) => ({
    id: song.id,
    title: song.title,
    audioUrl: song.audioUrl,
    imageUrl: song.imageUrl,
    duration: song.duration,
  }));
}
