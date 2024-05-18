

import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import {Navigate} from "react-router-dom";
import { createSearchParams,useSearchParams,useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';

import { Button, ButtonGroup } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter,Text,Stack,Box,Heading,HStack, VStack} from '@chakra-ui/react';
import { Input ,InputLeftAddon,InputGroup } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react';

  import { Spinner } from '@chakra-ui/react';
function T(){
    let [params] = useSearchParams();
    let n = useNavigate();
    let [username,suse] = useState(params.get("username"));
    let [gender,sgen] = useState(params.get("gender"));
    let [full_name,sful] = useState(params.get("full_name"));
    let [age,sa] = useState(params.get("age"));
    let[pno,spno] = useState(params.get("passport_no"));
    let [adno,sadno] = useState(params.get("adhaar_number"));
    let [contact,scontact] = useState(params.get("contact_no"));
    let [password,spwd] = useState(params.get("password"));
    let [month_val,smv] = useState(params.get("month"));
    let [day_val,sdv] = useState(params.get("day"));
    let [year_val,syv] = useState(params.get("year"));
    let [flight_month,sfm] = useState(params.get("flight_month"));
    let [flight_day,sfd] = useState(params.get("flight_day"));
    let [flight_year,sfy] = useState(params.get("flight_year"));
    let [start,ss] = useState(params.get("start"));
    let [end,send]  = useState(params.get("end"));
    let [flight_number,sfn] = useState(params.get("flight_number"));
    let [company,sc] = useState(params.get("company"));
    let [avl_seats,sas] = useState(params.get("avl_seats"));
    let [time,stc] = useState(params.get("time"));
    let [rows,srq] = useState(params.get("rows"));
    let [cols,sco] = useState(params.get("cols"));
    let [gap_one,sgo] = useState(params.get("gap_one"));
    let [gap_two,sgt] = useState(params.get("gap_two"));
    let [seats,n_use] = useState(JSON.parse(params.get("seats")));
    
    let [cost,n_cost] = useState(JSON.parse(params.get("cost")));
    console.log(seats);
    let [passenger_names,set_npn] = useState(JSON.parse(params.get("passenger_names")));
    let [passenger_ages,set_npa] = useState(JSON.parse(params.get("passenger_ages")));
    let [load,set_load] = useState(0);

    let cancel_booking = async()=>{
        
        let fr_data = {month:flight_month,day:flight_day,year:flight_year,start:start,end:end};
        let res = await fetch("http://localhost:8000/get_flight_travels_current",{
                method:"POST",
                headers:{'content-type': 'application/json'},
                body:JSON.stringify(fr_data),

        });

        let rgyu = await res.json();
        console.log(rgyu);
        let flights = [];
        let ards = rgyu.success;
        for(let hre = 0;hre<ards.length;hre++){
            flights.push(ards[hre]);
        }
        console.log(flights);
        n({
            pathname:"/flights_info",
            search: createSearchParams({
                username : username ,
                gender : gender,
                full_name : full_name,
                age:age,
                passport_no : pno,
                adhaar_number : adno,
                contact_no : contact,
                password : password,
                month : month_val,
                day:day_val,
                year:year_val,
                flight_month:flight_month,
                flight_day :flight_day,
                flight_year:flight_year,
                start:start,
                end : end,
                flights : JSON.stringify([...flights]),

                

                
                

            }).toString()

        });

    }

    let send_mail = async()=>{

        let fr_data = {email:username,flight_number:flight_number,flight_month:flight_month,flight_day:flight_day,flight_year:flight_year,time:time,passengers:passenger_names.length};
        set_load(1);
        let res = await fetch("http://localhost:8000/send_mail",{
                method:"POST",
                headers:{'content-type': 'application/json'},
                body:JSON.stringify(fr_data),

        });
        set_load(0);

    }

    if(load == 1){
        return (
            <div>
            <Text>YOUR TICKETS</Text>

            {
                [...passenger_names].map((index,value)=>{
                    return (
                        <Card key={value}>
                            <CardBody>
                                <Text>PASSENGER {value+1}</Text>
                                <Text > NAME : {index}</Text>
                                <Text>AGE : {passenger_ages[value]}</Text>
                            </CardBody>
                        </Card>
                    );
                })
            }
            
            <Card>
                <CardBody>
                    <HStack spacing='24px'>
                    <Text>SEATS ARE :</Text>
                    {
                        [...seats].map((index,value)=>{
                            return(
                                <Text key={value}>{index}</Text>
                            );
                            
                        })
                    }
                    </HStack>
                </CardBody>
            </Card>

            <Divider orientation='horizontal' />

            <Text> RS . {cost}</Text>

            <Spinner color='red.500' />
            <Button onClick={cancel_booking}>GO HOME</Button>

            

        </div>
        );

    }
    return (
        <div>
            <Text>YOUR TICKETS</Text>

            {
                [...passenger_names].map((index,value)=>{
                    return (
                        <Card key={value}>
                            <CardBody>
                                <Text>PASSENGER {value+1}</Text>
                                <Text > NAME : {index}</Text>
                                <Text>AGE : {passenger_ages[value]}</Text>
                            </CardBody>
                        </Card>
                    );
                })
            }
            
            <Card>
                <CardBody>
                    <HStack spacing='24px'>
                    <Text>SEATS ARE :</Text>
                    {
                        [...seats].map((index,value)=>{
                            return(
                                <Text key={value}>{index}</Text>
                            );
                            
                        })
                    }
                    </HStack>
                </CardBody>
            </Card>

            <Divider orientation='horizontal' />

            <Text> RS . {cost}</Text>

            <Button onClick={send_mail}>SEND EMAIL</Button>
            <Button onClick={cancel_booking}>GO HOME</Button>

            

        </div>
    );
}

export default T;