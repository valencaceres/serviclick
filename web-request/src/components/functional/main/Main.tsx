import React, {useState, useEffect} from 'react'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { ContentCol, ContentRow } from '@/components/layout/General/General'
import { Table, TableCell, TableHeader, TableRow, TableDetail, TableCellEnd } from '@/components/ui/Table'

import { useContractor } from '@/store/hooks'
import format from '@/utils/format'

const Main = () => {
  const [rut, setRut] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [openTable, setOpenTable] = useState(0)
  const {getByRutOrName, getContractorById, customer, contractor, contractorIsLoading} = useContractor()
  
  const rutFormated = format(rut)

  const handleClick = () => {
    getByRutOrName(rutFormated)
    setOpenTable(1)
  }

  useEffect(() => {
    getContractorById(customer.data[0].id)
  }, [customer])

  useEffect(() => {
    const balances = contractor.origins.map((origin) => origin.balance);
    const hasActiveBalance = balances.some((balance) => balance !== null);
    setIsActive(hasActiveBalance)
  }, [contractor])

  return (
    <ContentCol gap="10px" width="500px">
      <ContentRow>
        <h1 className='text-xl'>Inserta el rut de una persona para saber su estado</h1>
      </ContentRow>
      <Input onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRut(event.target.value)}/>
      <Button onClick={handleClick}/>
      {openTable === 1 && !contractorIsLoading ?
        <div>
          {!isActive ? 
          <Table height="80px">
            <TableHeader>
              <TableRow>
                <TableCell width='400px'>
                  Nombre
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width='90px'>
                  Estado
                </TableCell>
              </TableRow>
              <TableCellEnd></TableCellEnd>
            </TableHeader>
            <TableDetail>
              <TableRow>
                <TableCell width='400px'>
                  {customer.data[0].name}
                </TableCell>
                <TableCell width='90px'>
                  Activo
                </TableCell>
              </TableRow>
            </TableDetail>
          </Table>
          :
          <Table height="80px">
            <TableHeader>
              <TableRow>
                <TableCell width='400px'>
                  Nombre
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width='90px'>
                  Estado
                </TableCell>
              </TableRow>
              <TableCellEnd></TableCellEnd>
            </TableHeader>
            <TableDetail>
              <TableRow>
                <TableCell width='400px'>
                  {customer.data[0].name}
                </TableCell>
                <TableCell width='90px'>
                  No Activo
                </TableCell>
              </TableRow>
            </TableDetail>
          </Table>
        }
        </div>
        :
        null
      }
    </ContentCol>
  )
}

export default Main