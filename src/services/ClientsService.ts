/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { supabase } from '../config/supabase';
import { Client } from '../interfaces/Client';

export class ClientsService {
    static async getClients() {
        const { data, error } = await supabase.from('clients').select('*');
        if (error) {
            throw error;
        }
        return data;
    }
    static async getClient( id: number ) {
        const { data, error } = await supabase.from('clients').select('*').eq('id', id).single();
        if (error) {
            throw error;
        }
        return data;
    }
    static async addClient(client: Client) {
        const { error } = await supabase.from('clients').insert([client]);
        if (error) {
            throw error;
        }
    }
    static async updateClient(id: number, client: Client) {
        const { name, email, phone } = client;
        const { data, error } = await supabase
            .from('clients')
            .update({ name, email, phone })
            .eq('id', id)
            .select();
        if (error) {
            throw error;
        }
        if (!data || data.length === 0) {
            throw new Error('No se actualizó ningún registro (revisa las políticas RLS de UPDATE en Supabase)');
        }
        return data[0];
    }
    static async deleteClient( id: number ) {
        const { error } = await supabase.from('clients').delete().eq('id', id);
        if (error) {
            throw error;
        }

    }
}