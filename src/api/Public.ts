import request from '@/utils/request.ts';

export function ownMenu(){
    return request.get("/api/menu")
}