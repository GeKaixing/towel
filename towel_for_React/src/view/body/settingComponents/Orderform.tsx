import React from 'react'
import Backtab from '../../../components/Backtab'

export default function Orderform() {
    return (
        <>
            <Backtab text='设置' href='/setting'></Backtab>
            <div className='flex justify-center items-center'>
                <table className=' w-full text-center '>
                    <thead className='border bg-gray-200 '>
                        <th>商品</th>
                        <th>单价</th>
                        <th>数量</th>
                        <th>商品操作</th>
                        <th>订单总额</th>
                        <th>交易状态</th>
                        <th>操作</th>
                    </thead>
                    <tr className='h-6' ><td colSpan={7}></td></tr>
                    <tbody className='border'>
                        <tr className='bg-gray-100 border'>
                            <td>订单编号:2024112732332704611</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='cursor-pointer'>删除</td>
                        </tr>
                        <tr className='text-sm'>
                            <td>
                                Premium
                            </td>
                            <td>
                                ¥15.00
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                            </td>
                            <td>
                                ¥15.00
                            </td>
                            <td>
                                交易取消
                            </td>
                            <td className='cursor-pointer'>
                                再次购买
                            </td>
                        </tr>
                    </tbody>
                    <tr className='h-6'><td colSpan={7}></td></tr>
                    <tbody className='border'>
                        <tr className='bg-gray-100 border'>
                            <td>订单编号:202411273265236845</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='cursor-pointer'>删除</td>
                        </tr>
                        <tr className='text-sm'>
                            <td>
                                Premium+
                            </td>
                            <td>
                                ¥20.00
                            </td>
                            <td>
                                1
                            </td>
                            <td>
                            </td>
                            <td>
                                ¥20.00
                            </td>
                            <td>
                                交易取消
                            </td>
                            <td className='cursor-pointer'>
                                再次购买
                            </td>
                        </tr>
                    </tbody>
                    <tr className='h-6'><td colSpan={7}></td></tr>
                </table>
            </div>
        </>
    )
}
