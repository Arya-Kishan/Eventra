/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { getAllEventApi } from '@/services/EventService';
import { getAllPostApi } from '@/services/PostService';
import { createspotLightApi } from '@/services/SpotLightService';
import { EventType, PostType } from '@/types/AppTypes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const SpotLight = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [pic, setPic] = useState<any>(null);
    const [file, setFile] = useState<any>(null);
    const [category, setCategory] = useState<string>("");
    const [selectedData, setSelectedData] = useState<any>(null);

    const [events, setEvents] = useState<EventType[] | null>(null);
    const [posts, setPosts] = useState<PostType[] | null>(null);

    const getAllEvents = async () => {
        const { data } = await getAllEventApi();
        setEvents(data.data);
        console.log("EVENTS DATA : ", data)
    }

    const getAllPosts = async () => {
        const { data } = await getAllPostApi();
        setPosts(data.data);
        console.log("POSTS DATA : ", data)
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFile(file);
        console.log("FILE : ", file)
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPic(imageUrl);
        }
    };

    const createSpotLight = async () => {

        const formdata: any = new FormData();
        formdata.append("title", title);
        formdata.append("description", description);
        formdata.append("category", category);
        formdata.append("categoryId", selectedData._id);
        formdata.append("image", file);

        console.log("formdata : ", formdata);

        const { data } = await createspotLightApi(formdata);
        console.log(data)
    }

    useEffect(() => {
        getAllEvents();
        getAllPosts();
    }, [])

    console.log("CATEGORY : ", category)

    return (
        <div className='w-full h-screen flex flex-col gap-10 justify-center px-10'>

            <p className='text-4xl font-bold'>Create SpotLight</p>

            <div className='w-full flex flex-row gap-10'>

                <div className='w-full flex flex-col gap-8'>

                    <input className='w-full text-xl p-2 placeholder:text-red-700 rounded-2xl bg-white' type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} />

                    <input className='w-full text-xl p-2 placeholder:text-red-700 rounded-2xl bg-white' type="text" placeholder='Description' onChange={(e) => setDescription(e.target.value)} />

                    <div>

                        <select className='w-full p-2 bg-white text-red-500 rounded-3xl' name="choose" id="choose" onChange={(e) => setCategory(e.target.value)}>
                            <option className='text-red-600' value="event">Event</option>
                            <option className='text-red-600' value="post">Post</option>
                        </select>

                        {
                            selectedData == null
                                ?
                                "NOT SELECTED"
                                :
                                <p>{selectedData.title}</p>
                        }
                    </div>

                    <p className='text-2xl'>Choose Pic</p>

                    {
                        pic && <Image src={pic} width={100} height={100} alt='as' />
                    }

                    <input type="file" onChange={handleFile} />

                </div>



                <div className='w-full h-[500px] overflow-scroll'>

                    {
                        category == "event"
                            ?
                            <>
                                {
                                    events == null
                                        ?
                                        ""
                                        :
                                        events.map((event) => (
                                            <div key={event._id} className='flex flex-row gap-5' onClick={() => setSelectedData(event)}>

                                                <Image src={event.pic.url} width={100} height={100} alt='as' />

                                                <p className='text-2xl font-bold'>{event.title}</p>

                                            </div>
                                        ))
                                }
                            </>
                            :
                            <>
                                {
                                    posts == null
                                        ?
                                        ""
                                        :
                                        posts.map((post) => (
                                            <div key={post._id} className='flex flex-row gap-5' onClick={() => setSelectedData(post)}>

                                                <Image src={post.file.url!} width={100} height={100} alt='as' />

                                                <p className='text-2xl font-bold'>{post.title}</p>

                                            </div>
                                        ))
                                }
                            </>
                    }

                </div>

            </div>

            <button className='w-1/2 h-[50px] bg-red-500 text-white shadow-amber-50' onClick={createSpotLight}>ADD</button>

        </div>
    )
}

export default SpotLight