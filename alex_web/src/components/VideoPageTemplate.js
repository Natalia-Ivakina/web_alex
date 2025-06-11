import { useQuery } from "@tanstack/react-query";
import { loadVideos } from "../services/videoService";
import { loadVideoCount } from "../services/videoPerPageService";
import VideoList from "./VideoList";

const VideoPageTemplate = ({ apiType }) => {
  // fetch & cache videos
  const {
    data: videos = [],
    error: videosError,
    isLoading: videosLoading,
    refetch: refetchVideos,
  } = useQuery({
    queryKey: ["videos", apiType],
    queryFn: () => loadVideos(apiType),
    staleTime: 1000 * 60 * 5, //5 min
  });

  // fetch & cache number of videos per page
  const {
    data: videosPerPage = 4,
    error: countError,
    isLoading: countLoading,
  } = useQuery({
    queryKey: ["videosPerPage", apiType],
    queryFn: () => loadVideoCount(apiType),
    select: (quantity) => (isNaN(quantity) ? 4 : quantity),
  });

  // after any change - refetch
  const afterCRUDVideo = () => refetchVideos();

  if (videosLoading || countLoading) return <div>Loading...</div>;
  if (videosError || countError) return <div>Error loading videos</div>;

  return (
    <VideoList
      videos={videos}
      apiType={apiType}
      deleteVideos={afterCRUDVideo}
      reorderVideos={afterCRUDVideo}
      videosPerPage={videosPerPage}
      addVideos={afterCRUDVideo}
      changeColor={afterCRUDVideo}
    />
  );
};

export default VideoPageTemplate;
