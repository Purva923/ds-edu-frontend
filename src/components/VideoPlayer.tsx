interface Props {
  youtubeUrl?: string
}

export default function VideoPlayer({ youtubeUrl }: Props) {
  if (!youtubeUrl) return null
  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, margin: '16px 0' }}>
      <iframe
        src={youtubeUrl}
        title="Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
      />
    </div>
  )
}






