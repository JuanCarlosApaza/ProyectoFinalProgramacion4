interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg"
    text?: string
  }
  
export function LoadingSpinner({ size = "md", text = "Cargando..." }: LoadingSpinnerProps) {
    const sizeClasses = {
      sm: "h-10 w-10",
      md: "h-16 w-16",
      lg: "h-24 w-24",
    }
  
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className={`relative ${sizeClasses[size]}`}>
          {/* Outer spinning circle */}
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent border-primary animate-spin" />
  
          {/* Middle spinning circle (opposite direction) */}
          <div className="absolute inset-[4px] rounded-full border-4 border-l-transparent border-r-transparent border-primary/70 animate-[spin_1s_linear_infinite_reverse]" />
  
          {/* Inner pulsing circle */}
          <div className="absolute inset-[10px] rounded-full bg-primary/20 animate-pulse" />
  
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[20%] w-[20%] rounded-full bg-primary" />
          </div>
        </div>
  
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
    )
}
  