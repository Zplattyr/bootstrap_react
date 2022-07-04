import {Button,OverlayTrigger,Tooltip} from "react-bootstrap"

function Help() {
  return (
    <div className='fixed-bottom'>
    <OverlayTrigger
      key="top"
      placement="top"
      overlay={
        <Tooltip id={`tooltip-top`}>
          <h3>Добавление</h3>
          <p>Нажмите кнопку плюса, чтобы добавить задачу</p>
          <h3>Сокрытие</h3>
          <p>Нажмите на тело задачи, чтобы скрыть ее</p>
          <h3>Обновление</h3>
          <p>Нажмите на кнопку обновления, чтобы снова показать все скрытые задачи</p>
          <h3>Удаление</h3>
          <p>Нажмите на крестик в углу задачи, чтобы навсегда ее удалить</p>
        </Tooltip>
      }
    >
      <Button className="help" variant="secondary"></Button>
    </OverlayTrigger>
    </div>
  )
}

export default Help;
