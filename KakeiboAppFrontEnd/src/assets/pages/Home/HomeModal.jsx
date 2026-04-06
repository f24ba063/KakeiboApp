import { useState } from 'react';

export default function HomeModal({ setWarning, UserPaydaySet,
    setIsModalOpen }) {
    const [editPayday, setEditPayday] = useState(1);

    //給料日設定
    const setPaydayInBoundary = (e) => {
        if (e > 28) {
            setEditPayday(28);
            setWarning("29日以降は給料日として設定できません");
        }
        else if (e < 1) {
            setEditPayday(1);
            setWarning("1日以前は給料日として設定できません");
        }
        else {
            setEditPayday(Number(e));
            setWarning("");
        }
    }

    return (
        <>
            <div className="modal-overlay">
                <div className="modal">
                    <h3>給料日を入力</h3>

                    {/*更新数値入力*/}
                    <input
                        type="number"
                        value={editPayday}
                        onChange={(e) => setPaydayInBoundary(e.target.value)}
                    />

                    <button type="button"
                        onClick={() => {
                            //更新確定データをDBに
                            UserPaydaySet(editPayday);
                            setEditPayday(1);
                            setIsModalOpen(false);
                        }
                        }>保存
                    </button>

                    <button type="button"
                        onClick={() => {
                            setEditPayday(1);
                            setIsModalOpen(false);
                        }}>
                        キャンセル
                    </button>
                </div>
            </div>
        </>
    )
}