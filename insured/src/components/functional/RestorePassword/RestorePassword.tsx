import React, {useState} from 'react'

import { Component, Row, Cell, CellSeparator } from "../../layout/Component";

import InputText from '../../ui/InputText';
import Button from '../../ui/Button';

import { useUserInsured } from '../../../zustand/hooks';

import styles from './password.module.scss'

const RestorePassword = () => {

    const [email, setEmail] = useState('')
    const {restorePassword, isRestored} = useUserInsured()

    const handleClickRestorePassword = () => {
        restorePassword(email)
    }

  return (
<div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100% - 70px)",
      }}>
      <Component>
      {isRestored ? 
        <Cell>
            <h1>¡Se ha enviado un correo a tu casilla de correo electrónico con tu nueva contraseña!</h1>
        </Cell>
      :
        <Row>
            <Cell align='center'>
                <Row>
                    <Cell align='center'>
                        <h1 className={styles.restore}>Restaurar contraseña</h1>
                    </Cell>
                </Row>
                <Row>
                    <Cell align="center">
                        <InputText
                            label="Correo electrónico"
                            type="email"
                            width="250px"
                            value={email}
                            onChange={(e: any) =>
                            setEmail(e.target.value)}
                        />
                    </Cell>
                </Row>
                <Row>
                    <Cell align='center'>
                        <Button text='Enviar' onClick={handleClickRestorePassword}/>
                    </Cell>
                </Row>
            </Cell>
        </Row>
        }
      </Component>
    </div>
  )
}

export default RestorePassword