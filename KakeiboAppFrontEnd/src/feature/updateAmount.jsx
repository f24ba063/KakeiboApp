import normalizeNumber from './normalizeNumber';

export default function updateAmount(kakeiboDto, setKakeiboDto, setErrors) {
    return (
        <input
            type="text"
            inputMode="numeric"

            value={kakeiboDto.amount === 0
                ? ""
                : kakeiboDto.amount}

            onChange={(e) => {
                if (e.nativeEvent.isComposing) return;

                const input = e.target.value;
                const { num } = normalizeNumber(input);//7桁にされNumberに型変換された数値
                
                const number = num === "" ? 0 : Number(num);

                let error = "";

                const rawNum = input.replace(/[^0-9]/g, "");//入力値をNumber型に変えたもの

                if (Number(rawNum) >= 10000000) {
                    setErrors(prev => ({
                        ...prev,
                        amount: "入力金額は最大999万9999円です"
                    }));
                    return;
                }

                // 不正入力ならここで止める
                if (input !== num) {
                    setErrors(prev => ({
                        ...prev,
                        amount: "数字以外は入力できません"
                    }));
                    return;
                }

                setErrors(prev => ({
                    ...prev,
                    amount: error
                }));

                setKakeiboDto({
                    ...kakeiboDto,
                    amount: number
                });
            }}
        />
    )
}
