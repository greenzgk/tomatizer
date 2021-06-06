export interface ClassNameProps {
  className?: string
}

export interface ColorProps {
  primary?: boolean
  secondary?: boolean
}

export type PropsWithClassName<P> = P & ClassNameProps
export type PropsWithColors<P> = P & ColorProps

export type MuiProps<P = unknown> = PropsWithClassName<P> & PropsWithColors<P>
