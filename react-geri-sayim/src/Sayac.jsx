import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

export default function Sayac() {
    const [saniye, setSaniye] = useState(10);
    const [dakika, setDakika] = useState(1);
    const [saat, setSaat] = useState(0);
    const [yedekSaniye, setYedekSaniye] = useState(saniye);
    const [yedekDakika, setYedekDakika] = useState(dakika);
    const [yedekSaat, setYedekSaat] = useState(saat);
    const [calisiyor, setCalisiyor] = useState(false);
    const [duzenleniyor, setDuzenleniyor] = useState(false);

    const sureyiAzalt = () => {
        if (saniye > 0) {
            setSaniye(saniye - 1);
        } else {
            if (dakika > 0) {
                setDakika(dakika - 1);
                setSaniye(59);
            } else {
                if (saat > 0) {
                    setSaat(saat - 1);
                    setDakika(59);
                    setSaniye(59);
                } else {
                    toast("Bitti");
                    clearInterval(intervalRef.current);
                    setCalisiyor(false);
                }
            }
        }
    };

    const duzenle = () => {
        setDuzenleniyor(true);
        setYedekSaat(saat);
        setYedekDakika(dakika);
        setYedekSaniye(saniye);
    }

    const kaydet = () => {
        if (saniye === 0 && dakika === 0 && saat === 0) {
            toast("3 değer de sıfır olamaz!", { autoClose: 2000 })
            iptal()
            return;
        }
        setDuzenleniyor(false);
        setYedekSaat(saat);
        setYedekDakika(dakika);
        setYedekSaniye(saniye);
    }

    const iptal = () => {
        setDuzenleniyor(false);
        setSaat(yedekSaat);
        setDakika(yedekDakika);
        setSaniye(yedekSaniye)
    }

    const intervalRef = useRef();

    useEffect(() => {
        if (calisiyor) {
            intervalRef.current = setInterval(sureyiAzalt, 1000);
            return () => clearInterval(intervalRef.current);
        }
    }, [calisiyor, saat, dakika, saniye]);

    return (
        <>
            <h1 className="text-center mb-4 fs-1">SAYAÇ</h1>
            <Container className="sayac" style={{ minWidth: "350px", maxWidth: "700px" }}>
                <Row xs={8} style={{ minHeight: "380px" }} className="ekran">
                    <Col xs={3}>
                        <div>
                            <Button variant="dark" hidden={!duzenleniyor} onClick={() => setSaat((prev) => (prev < 99 ? prev + 1 : 0))}><i class="fa-solid fa-caret-up"></i></Button>
                        </div>
                        <div>
                            {saat >= 10 ? saat : "0" + saat}
                        </div>
                        <div>
                            <Button variant="dark" hidden={!duzenleniyor} onClick={() => setSaat((prev) => (prev > 0 ? prev - 1 : 99))}><i class="fa-solid fa-caret-down"></i></Button>
                        </div>
                    </Col>
                    <Col xs={1}>
                        :
                    </Col>
                    <Col xs={3}>
                        <div>
                            <Button variant="dark" hidden={!duzenleniyor} onClick={() => setDakika((prev) => (prev < 59 ? prev + 1 : 0))}><i class="fa-solid fa-caret-up"></i></Button>
                        </div>
                        <div>
                            {dakika >= 10 ? dakika : "0" + dakika}
                        </div>
                        <div>
                            <Button variant="dark" hidden={!duzenleniyor} onClick={() => setDakika((prev) => (prev > 0 ? prev - 1 : 59))}><i class="fa-solid fa-caret-down"></i></Button>
                        </div>
                    </Col>
                    <Col xs={1}>
                        :
                    </Col>
                    <Col xs={3}>
                        <div>
                            <Button variant="dark" hidden={!duzenleniyor} onClick={() => setSaniye((prev) => (prev < 59 ? prev + 1 : 0))}><i class="fa-solid fa-caret-up"></i></Button>
                        </div>
                        <div>
                            {saniye >= 10 ? saniye : "0" + saniye}
                        </div>
                        <div>
                            <Button variant="dark" hidden={!duzenleniyor} onClick={() => setSaniye((prev) => (prev > 0 ? prev - 1 : 59))}><i class="fa-solid fa-caret-down"></i></Button>
                        </div>
                    </Col>
                </Row>
                <div className="butonlar" >
                    <div className="duzenleme mb-1">
                        <Button variant="dark" hidden={duzenleniyor} disabled={calisiyor} onClick={duzenle}><i class="fa-solid fa-pencil"></i></Button>
                        <Button variant="dark" hidden={!duzenleniyor} onClick={kaydet}><i class="fa-solid fa-check"></i></Button>
                        <Button variant="dark" hidden={!duzenleniyor} onClick={iptal}><i class="fa-solid fa-xmark"></i></Button>
                    </div>
                    <div className="baslatDurdur mb-1">
                        <Button disabled={duzenleniyor} variant="dark" hidden={calisiyor} onClick={() => setCalisiyor(true)}>Başlat</Button>
                        <Button variant="dark" hidden={!calisiyor} onClick={() => setCalisiyor(false)}>Durdur</Button>
                        <Button variant="dark" hidden={!calisiyor} onClick={() => { setCalisiyor(false); iptal() }}>Sıfırla</Button>
                    </div>
                </div>
            </Container>
            <ToastContainer
                position="top-center"
                autoClose={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="dark"
            />
        </>
    );
}
