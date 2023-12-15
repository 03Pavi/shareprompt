import SearchBar from '@/components/search-bar'
import React from 'react'
import Header from '@/components/header'
import ThoughtsList from '@/components/thoughts-list'
import { updateUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs';
const Home = async () => {
  const user = await currentUser();
  if (!user) return null;

  await updateUser({
    userId: user.id,
    image: user.imageUrl,
    username: user.username || user.emailAddresses[0].emailAddress,
    name: user.firstName || '',
    path: '/',
  });

  return (
    <div>
      <Header />
      <SearchBar />
      <ThoughtsList />
    </div>
  )
}

export default Home
