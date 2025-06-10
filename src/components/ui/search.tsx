import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Realm from 'realm-web';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { toast } from 'react-toastify';

const Header = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [autoComplete, setAutoComplete] = useState([]);

  useEffect(() => {
    async function getSearchTerm() {
      if (searchTerm.length) {
        // add your Realm App Id to the .env.local file
        const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();
        try {
          const user = await app.logIn(credentials);
          const searchAutoComplete = await user.functions.searchAutoComplete(
            searchTerm
          );
          setAutoComplete(() => searchAutoComplete);
        } catch (error) {
          toast.error(error);
        }
      } else {
        setAutoComplete([]);
      }
    }
    getSearchTerm();
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: `/search/${searchTerm}`,
    });

    setSearchTerm('');
  };

  const handleSelect = (searchTerm) => {
    setSearchTerm('');
    router.push({
      pathname: `/search/${searchTerm}`,
    });
  };

  return (
    <header>
      <div className='flex justify-center -mt-[44px] mx-auto max-w-[30vw] sm:max-w-[100%]'>
        <div className='w-[100%] max-w-[100%] sm:max-w-[70%] mx-auto sm:left-[15%] '>
          <form onSubmit={handleSubmit} className='flex justify-center'>
            <div
              className='
              rounded-l-xl
              w-[40px] 
              h-full 
              p-2
              bg-[rgb(255,255,255)] 
            text-[rgba(136,123,123,0.57)]'
            >
              <SearchOutlinedIcon />
            </div>
            <input
              className='
              rounded-r-xl
              w-full border-[rgb(255,255,255)]  border-1
              focus:border-sky-500
              focus:border-0
              placeholder-[#C95423]
              placeholder:text-[10px]
              text-center
              text-[#C95423]
              '
              type='text'
              placeholder='Bedrijfsnaam - Functie - Stad - Provincie'
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            ></input>
          </form>
          {autoComplete.length > 0 && (
            <ul
              className='
            rounded-xl
            absolute 
            h-10 
            max-w-[30vw]
            w-full
            sm:w-screen
            mx-auto z-50 top-[70%]
            sm:top-[70%] 
            text-sky-50 text-[15px]
            sm:left-0'
            >
              {autoComplete.map((item) => {
                return (
                  <li
                    key={item._id}
                    className='
                    py-2 
                    text-center 
                    cursor-pointer 
                    bg-[#887b7beb]
                    text-[15px]
                    text-transparant
                    rounded-md'
                    onClick={() => handleSelect(item.stad)}
                  >
                    {item.stad}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
