import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

const Tag = ({children, className, count, ...props})=>{
    return count ? (
        <div>
            <Link href={{pathnane:'/',query:{tag: children}}}>
                <a className=''>
                    {children}
                </a>
            </Link>
            <span>
                
            </span>
        </div>
    ):(
        <Link>
        </Link>
    )

    }

export default Tag