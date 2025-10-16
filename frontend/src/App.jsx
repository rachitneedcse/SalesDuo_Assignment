import React from 'react'
import OptimizeForm from './components/OptimizeForm'
import History from './components/History'
export default function App(){
  return (
    <div className="container">
      <h1>SalesDuo - Amazon Listing Optimizer</h1>
      <OptimizeForm />
      <hr />
      <History />
    </div>
  )
}
