import Link from 'next/link'

type Props = {}

const DefaultHome = (props: Props) => {
  return (
    <div>
      <Link href="/account/sign-in">Sign in</Link><br />
      <Link href="/account/sign-up">I don&apos;t have an account</Link><br />
    </div>
  )
}

export default DefaultHome