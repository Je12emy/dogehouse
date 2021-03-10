defmodule Kousa.Beef.UserBlocksTest do
  # allow tests to run in parallel
  use ExUnit.Case, async: true
  use Kousa.Support.EctoSandbox

  alias Kousa.Support.Factory
  alias Beef.UserBlocks
  alias Beef.Schemas.UserBlock
  # alias

  alias Beef.Schemas.User
  # alias Beef.Repo

  describe "UserBlocks" do
    test "insert" do

      %{id: uid} = Factory.create(User)
      %{id: bid} = Factory.create(User)

      assert {:ok, %UserBlock{} = ub } = UserBlocks.insert(%{ userId: uid, userIdBlocked: bid })
      assert ub.userId == uid
      assert ub.userIdBlocked == bid
    end

    test "blocked?" do
      %{id: uid} = Factory.create(User)
      %{id: bid} = Factory.create(User)

      {:ok, %UserBlock{} = ub } = UserBlocks.insert(%{ userId: uid, userIdBlocked: bid })

      assert UserBlocks.blocked?(uid, bid)
      assert !UserBlocks.blocked?(bid, uid)
    end
  end
end
