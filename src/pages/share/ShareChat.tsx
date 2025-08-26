import { useParams } from '@tanstack/react-router'
import useQueryPublicChat from './apis/queries/useQueryPublicChat'
import MarkdownPreview from '@uiw/react-markdown-preview'
import { useSystemContext } from '@/contexts/SystemContext'

const ShareChat = () => {
  const params = useParams({ from: '/share/$chatId' })
  const { data, isLoading } = useQueryPublicChat(params.chatId)
  const { darkmode } = useSystemContext()

  if (isLoading || !data) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="spinner-loader mx-4 my-2 p-1"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-[800px] px-4 py-4">
        <h1 className="text-2xl font-semibold mb-2">{data.title}</h1>
        <div className="text-sm text-muted-foreground mb-4">Shared chat (read-only)</div>
        <div className="space-y-6">
          {data.chatQueries.map((q) => (
            <div key={q._id} className="space-y-2">
              <MarkdownPreview
                source={q.prompt}
                className="rounded-lg p-2 markdown-preview"
                style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}
                wrapperElement={{ 'data-color-mode': darkmode ? 'dark' : 'light' }}
              />
              {q.error?.trim() ? (
                <div className="rounded-lg p-3 markdown-preview dark:bg-red-800/20 dark:text-red-400 bg-red-200/80 text-red-800">
                  {q.error}
                </div>
              ) : (
                <MarkdownPreview
                  source={q.response}
                  className="rounded-lg p-3 pl-0 markdown-preview"
                  style={{ backgroundColor: 'var(--markdown-assistant-background)', color: 'var(--markdown-assistant-text)' }}
                  wrapperElement={{ 'data-color-mode': darkmode ? 'dark' : 'light' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShareChat
