import { API } from "aws-amplify"

const AccountService = {
  async getBalance(id: Account["id"]): Promise<Account> {
    return API.get("api", `${id}/balance`, {})
  },
  async list(): Promise<Account[]> {
    return API.get("api", "/accounts", {})
  },
  async create(name: Account["name"], number: Account["number"]): Promise<Account> {
    return API.post("api", "/accounts", { body: { name, number } })
  },
}
export default AccountService
