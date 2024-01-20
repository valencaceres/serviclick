/**
 * v0 by Vercel.
 * @see https://v0.dev/t/z1xnS8ym0WR
 */
import { AlertTitle, AlertDescription, Alert } from "@/components/ui/alert"

export default function Mainteance() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Alert className="p-4 bg-[hsl(69,69%,47%)] text-[hsl(0,0%,100%)] shadow-lg rounded-lg">
        <div className="flex items-center gap-2">
          <AlertCircleIcon className="h-4 w-4 text-[hsl(0,0%,100%)]" />
          <ImagePlusIcon className="h-4 w-4 text-[hsl(0,0%,100%)]" />
        </div>
        <AlertTitle className="text-[hsl(0,0%,100%)]">Error</AlertTitle>
        <AlertDescription className="text-[hsl(0,0%,100%)]">
          Estamos realizando mejoras en nuestro sistema, ya pronto estaremos contigo.
        </AlertDescription>
      </Alert>
    </div>
  )
}

function AlertCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  )
}


function ImagePlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
      <line x1="16" x2="22" y1="5" y2="5" />
      <line x1="19" x2="19" y1="2" y2="8" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}
