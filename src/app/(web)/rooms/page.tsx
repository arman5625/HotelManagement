"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import useSWR from "swr";

import { getRooms } from "@/src/libs/api";
import { Room } from "@/src/models/room";
import Search from "@/src/components/Search/Search";
import RoomCard from "@/src/components/RoomCard/RoomCard";

const Rooms = () => {
    const [roomTypeFilter, setRoomTypeFilter] = useState("");
    const [searchQuery, setSearchQuery] =useState("");

    const searchParams = useSearchParams();

    useEffect( ()=> {
        const searchQuery = searchParams.get('searchQuery');
        const roomType = searchParams.get("roomType");
        
        if(searchQuery) setSearchQuery(searchQuery);
        if(roomType)  setRoomTypeFilter(roomType);

    }, [searchParams]);

    async function fetchData() {
        return getRooms();
    }

    const { data, error, isLoading } = useSWR("get/hotelRooms", fetchData)

    if(error) throw new Error("cannot fetch data");
    if(typeof data === "undefined" && !isLoading)
        throw new Error("Cannot fetch data");
   
    const filterRooms = (rooms:Room[]) => {
        return rooms.filter(room => {
            if(
                roomTypeFilter &&
                roomTypeFilter.toLowerCase() !== "all" &&
                room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
            ){
                return false;
            }
            if(
                searchQuery && 
                !room.name.toLowerCase().includes(searchQuery.toLowerCase())
            ){
                return false;
            }
            return true;
        })
    }

    const filteredRooms = filterRooms(data || []);
    console.log("filterrooms", filteredRooms);

  return (
    <div className="container mx-auto">
      <Search 
      roomTypeFilter={roomTypeFilter} 
      searchQuery={searchQuery}
      setRoomTypeFilter={setRoomTypeFilter}
      setSearchQuery={setSearchQuery}
      />

      <div className="flex mt-20 justify-between flex-wrap">
        {filteredRooms.map(room => (
            <RoomCard key={room._id}  room={room}/>
        ))}
      </div>
    </div>
  )
}

export default Rooms

