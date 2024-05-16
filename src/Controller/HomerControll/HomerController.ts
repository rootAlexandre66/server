
export async function home(req,res){
    try {
      const result = 'r';

      res.status(200).json({ msg: req.url, result });

    } catch (error) {

      console.error('Erro interno do servidor:', error);
      
      res.status(500).json({ message: 'Internal server error' });
    }
  };

