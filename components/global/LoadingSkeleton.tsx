export default function LoadingSkeleton() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50">
            <div className="animate-pulse flex flex-col gap-4 p-8">
                <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
               <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
               <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
               <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
        </div>
    );
}