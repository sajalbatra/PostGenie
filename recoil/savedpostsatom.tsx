import { atom } from "recoil";
import { Post } from '@/components/Home/Home'; // Import the Post interface

const savedpostsatom=atom<Post[]>({
    key: 'savedpost',
    default: [],

})
export default savedpostsatom