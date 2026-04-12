import normalizeNumber from './normalizeNumber';

export default function updateAmount(kakeiboDto, setKakeiboDto, setErrors) {
    return (
        <input
            type="text"

            value={kakeiboDto.amount === 0
                ? ""
                : kakeiboDto.amount}

            onChange={(e) => {
                if (e.nativeEvent.isComposing) return;

                const input = e.target.value;
                const { num } = normalizeNumber(input);
                
                // 不正入力ならここで止める
                if (input !== num) {
                    setErrors(prev => ({
                        ...prev,
                        amount: "数字以外は入力できません"
                    }));
                    return;
                }

                const number = num === "" ? 0 : Number(num);

                let error = "";

                if (number >= 10000000) {
                    error = "金額が大きすぎます";
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
