# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create([
  { username: "OolongMilkTeaOnly", email: "DemoUser@Tea.Mi", password: "password"}
])

# Chat.create([
#   { name: "OolongMilkTeaOnly" }
# ])

# ChatMembership.create([
#   { 
#     member_id: User.find_by(email: "DemoUser@Tea.Mi").id,
#     chat_id: Chat.find_by(name: "OolongMilkTeaOnly").id
#   }
# ])

Message.create([
  {
    body: "This is a test Teami message!",
    author_id: User.find_by(email: "DemoUser@Tea.Mi").id,
    chat_id: Chat.find_by(name: "OolongMilkTeaOnly").id
  }
])