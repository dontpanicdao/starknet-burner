import { useStarknet } from '@starknet-react/core'

const Account = () => {
  const { account } = useStarknet()

  return <div>{account ? "Gm " : ""}{account}</div>
}

export default Account
