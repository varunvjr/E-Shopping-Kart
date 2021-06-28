import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
const SearchBox = () => {
    const history=useHistory();
    const [keyword,setKeyword]=useState('');

    const submitHandler=(e)=>{
        e.preventDefault();
        if(keyword){
            keyword.trim();
            history.push(`/search/${keyword}`)
        }else{
            history.push("/")
        }
    }
  
    return (
        <div>
            <Form  onSubmit={submitHandler} style={{paddingRight:'480px'}}>
                <Form.Control  style={{display:'inline-block',width:'65%'}}
                    type='text'
                    placeholder='Search products...'
                    className='mr-sm-2 ml-sm-5'
                    name='q'
                    onChange={(e)=>setKeyword(e.target.value)}
                    value={keyword}
                >
                </Form.Control>
                <Button variant='outline-success' type='submit' style={{display:'inline-block',width:'30%',paddingLeft:'20px',marginLeft:'4%'}}>Search</Button>
            </Form>
            
        </div>
    )
}

export default SearchBox
