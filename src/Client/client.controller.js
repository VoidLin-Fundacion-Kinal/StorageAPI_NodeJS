'use strict'
import Client from './client.model.js'

export const getAllClient = async (req,res) => {
    try {
        const {limit,skip}=req.query
        const client = await Client.find()
        .skip(skip)
        .limit(limit)

        if(client.length === 0){
            return res.status(404).send(
                {
                    success:false,
                    message:'Client not found'
                }
            )
        }
        return res.send(
            {
                success:true,
                message:'Client found',
                total:client.length,client
            }
        )
        
    } catch (error) {
        console.error('general error',error)
        return res.status(500).send(
            {
                success:false,
                message:'general error with getAllServices',
                error
            }
        )
    }
}

export const addClient = async (req,res) => {
    try {
        const data = req.body
        let client= new Client(data)

        await client.save()
        return res.status(201).send(
            {
                success:true,
                message:'client registered successfully',
                client
            }
        )
        
    } catch (error) {
        console.error('general error',error)
        return res.status(500).send(
            {
                success:false,
                message:'general error with addClient',
                error
            }
        )
    }
}


export const updateClient = async (req,res) => {
    try {
        const {id}=req.params
        const data = req.body

        const updateClient = await Client.findByIdAndUpdate(
            id,
            data,
            {new:true}
        )

        if(!updateClient){
            return res.status(404).send(
                {
                    success:false,
                    message:'Client not found'
                }
            )
        }
        return res.status(200).send(
            {
                success:true,
                message:'Client updated successfully'
            }
        )
    
    } catch (error) {
        console.error('general error',error)
        return res.status(500).send(
            {
                success:false,
                message:'general error with updateClient',
                error
            }
        )
    }
}


export const deleteClient = async (req,res) => {
    try {
        const {id}=req.params
        const data = req.body

        const deleteClient = await Client.findByIdAndDelete(id)

        if(!deleteClient){
            return res.status(404).send(
                {
                    success:false,
                    message:'Client not found'
                }
            )
        }
        return res.send(
            {
                success:true,
                message:'Client delelted successfully'
            }
        )
        
    } catch (error) {
        console.error('general error',error)
        return res.status(500).send(
            {
                success:false,
                message:'general error with updateClient',
                error
            }
        )
    }
}