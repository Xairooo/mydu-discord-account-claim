import { type CacheType, type Interaction, SlashCommandBuilder } from 'discord.js'
import { Account } from '~/server/models/mongo'
import type { Command } from '~~/shared/command'

const command = new SlashCommandBuilder()
  .setName('list')
  .setDescription('List your linked accounts.')

const action = async (interaction: Interaction<CacheType>) => {
  const accounts = await Account.find({ provider_id: interaction.user.id })
  if (accounts.length === 0) {
    await interaction.reply({ content: 'You have not linked any accounts.', ephemeral: true })
    return
  }
  const account_names = accounts.map(a => '`' + a.du_account_name + '`').join(', ')
  await interaction.reply({ content: `Linked accounts: ${account_names}`, ephemeral: true })
}

const list = {
  command,
  action,
} as Command

export { list }